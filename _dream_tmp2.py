import sqlite3, json

DB = r'C:\Users\LUCAS NUNES\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB)
cur = conn.cursor()

# Get assistant text parts from current session (main agent only)
cur.execute("""
    SELECT p.id, p.data 
    FROM part p 
    JOIN message m ON p.message_id = m.id 
    WHERE m.session_id = 'ses_08e812cd4ffeIujWVQpSH9jwVn'
    AND m.agent_id = 'main'
    ORDER BY p.time_created
""")
parts = cur.fetchall()
print("=== CURRENT SESSION: Main agent text parts ===")
for pid, pdata in parts:
    pd = json.loads(pdata)
    ptype = pd.get('type', '?')
    if ptype == 'text':
        txt = pd.get('text', '')
        print(f"\n--- Part {pid[:30]} type=text ---")
        print(txt[:3000])
    elif ptype == 'tool':
        tool = pd.get('tool', '?')
        state = pd.get('state', {})
        out = state.get('output', '')
        if isinstance(out, str) and len(out) > 0:
            print(f"\n--- Part {pid[:30]} type=tool tool={tool} ---")
            print(f"Input: {str(state.get('input', ''))[:200]}")
            print(f"Output: {out[:2000]}")
    elif ptype == 'reasoning':
        txt = pd.get('text', '')
        if isinstance(txt, dict):
            txt = txt.get('text', '')
        print(f"\n--- Part {pid[:30]} type=reasoning ---")
        print(str(txt)[:2000])

conn.close()
