import sqlite3, json, sys

DB = r'C:\Users\LUCAS NUNES\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB)
cur = conn.cursor()

def dump_session(sid):
    cur.execute("SELECT id, agent_id, data FROM message WHERE session_id = ? ORDER BY time_created", (sid,))
    rows = cur.fetchall()
    print(f"\n=== Session: {sid} ({len(rows)} messages) ===")
    for i, (mid, agent_id, data) in enumerate(rows):
        d = json.loads(data)
        role = d.get('role', '?')
        content = d.get('content', '')
        if isinstance(content, list):
            # assistant messages with content list
            text_parts = []
            for item in content:
                if isinstance(item, dict):
                    if item.get('type') == 'text':
                        text_parts.append(item.get('text', '')[:500])
                    elif item.get('type') == 'tool_use':
                        text_parts.append(f"[tool_use: {item.get('name', '?')}]")
            content_str = ' '.join(text_parts)[:800]
        elif isinstance(content, str):
            content_str = content[:800]
        else:
            content_str = str(content)[:200]
        print(f"  MSG {i} | role={role} | agent={agent_id} | {content_str}")
    return rows

def dump_parts(sid):
    cur.execute("PRAGMA table_info(part)")
    cols = [r[1] for r in cur.fetchall()]
    print(f"\n  Part columns: {cols}")
    
    cur.execute("SELECT id, message_id, session_id, data FROM part WHERE session_id = ? ORDER BY time_created", (sid,))
    parts = cur.fetchall()
    print(f"  Total parts: {len(parts)}")
    for pid, mid, _, pdata in parts:
        pd = json.loads(pdata)
        ptype = pd.get('type', '?')
        if ptype == 'text':
            txt = pd.get('text', '')[:600]
            print(f"    Part {pid[:20]}... msg={mid[:20]}... type=text: {txt}")
        elif ptype == 'tool':
            tool_name = pd.get('tool', '?')
            state = pd.get('state', {})
            inp = str(state.get('input', ''))[:200]
            out = str(state.get('output', ''))[:200]
            print(f"    Part {pid[:20]}... msg={mid[:20]}... type=tool tool={tool_name}")
            print(f"      input: {inp}")
            print(f"      output: {out}")
        elif ptype in ('step-start', 'step-finish'):
            print(f"    Part {pid[:20]}... msg={mid[:20]}... type={ptype}")
        else:
            print(f"    Part {pid[:20]}... msg={mid[:20]}... type={ptype}: {str(pd)[:300]}")

# Dump exploration session
dump_session('ses_08e812d33ffe2p4jihxCDLEmKB')
dump_parts('ses_08e812d33ffe2p4jihxCDLEmKB')

# Also check current session
dump_session('ses_08e812cd4ffeIujWVQpSH9jwVn')

conn.close()
