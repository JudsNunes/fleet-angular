import sqlite3, json

DB = r'C:\Users\LUCAS NUNES\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB)
cur = conn.cursor()

# Get the explore-1 agent's final text summary (msg index 8 = main agent summary)
cur.execute("""
    SELECT p.id, p.data
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = 'ses_08e812d33ffe2p4jihxCDLEmKB'
    AND m.agent_id = 'main'
    ORDER BY p.time_created
""")
parts = cur.fetchall()
print("=== MAIN AGENT: Final summary in exploration session ===")
for pid, pdata in parts:
    pd = json.loads(pdata)
    ptype = pd.get('type', '?')
    if ptype == 'text':
        txt = pd.get('text', '')
        if '<system-reminder>' not in txt:
            print(f"\n--- Part {pid[:30]} ---")
            print(txt[:8000])

# Also get the explore-2 agent's final summary
cur.execute("""
    SELECT p.id, p.data
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = 'ses_08e812d33ffe2p4jihxCDLEmKB'
    AND m.agent_id = 'explore-2'
    AND json_extract(p.data, '$.type') = 'text'
    ORDER BY p.time_created DESC
""")
parts = cur.fetchall()
if parts:
    pid, pdata = parts[0]
    pd = json.loads(pdata)
    print(f"\n=== EXPLORE-2 AGENT: Final summary ===")
    print(pd.get('text', '')[:8000])

conn.close()
