import sqlite3, json

DB = r'C:\Users\LUCAS NUNES\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB)
cur = conn.cursor()

# Get all parts from exploration session
cur.execute("""
    SELECT p.id, p.data, m.agent_id
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = 'ses_08e812d33ffe2p4jihxCDLEmKB'
    ORDER BY p.time_created
""")
parts = cur.fetchall()
print("=== EXPLORATION SESSION: All parts ===")
for pid, pdata, agent_id in parts:
    pd = json.loads(pdata)
    ptype = pd.get('type', '?')
    if ptype == 'text':
        txt = pd.get('text', '')
        if '<system-reminder>' in txt:
            continue
        print(f"\n--- Part {pid[:30]} agent={agent_id} type=text ---")
        print(txt[:5000])
    elif ptype == 'tool':
        tool = pd.get('tool', '?')
        state = pd.get('state', {})
        out = state.get('output', '')
        if isinstance(out, str) and len(out) > 100:
            print(f"\n--- Part {pid[:30]} agent={agent_id} type=tool tool={tool} ---")
            inp = state.get('input', {})
            if isinstance(inp, dict):
                print(f"Input: {json.dumps(inp, ensure_ascii=False)[:200]}")
            print(f"Output: {out[:3000]}")

conn.close()
