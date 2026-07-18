import sqlite3, json

DB = r'C:\Users\LUCAS NUNES\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB)
cur = conn.cursor()

# Get the explore-1 agent's text summary (the large one)
cur.execute("""
    SELECT p.id, p.data
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = 'ses_08e812d33ffe2p4jihxCDLEmKB'
    AND m.agent_id = 'explore-1'
    AND json_extract(p.data, '$.type') = 'text'
    ORDER BY p.time_created DESC
""")
parts = cur.fetchall()
for pid, pdata in parts:
    pd = json.loads(pdata)
    txt = pd.get('text', '')
    if len(txt) > 200:
        print(f"=== EXPLORE-1 AGENT: {pid[:30]} ===")
        print(txt[:10000])

# Also get explore-2 agent's text
cur.execute("""
    SELECT p.id, p.data
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = 'ses_08e812d33ffe2p4jihxCDLEmKB'
    AND m.agent_id = 'explore-2'
    AND json_extract(p.data, '$.type') = 'text'
    ORDER BY p.time_created
""")
parts = cur.fetchall()
for pid, pdata in parts:
    pd = json.loads(pdata)
    txt = pd.get('text', '')
    if len(txt) > 100:
        print(f"\n=== EXPLORE-2 AGENT: {pid[:30]} ===")
        print(txt[:10000])

conn.close()
