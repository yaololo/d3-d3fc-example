/* eslint-disable */
//@ts-nocheck
export function xerToJson(xer = '') {
  let proj = { tables: {} },
    table,
    fields
  xer
    .replace('\r', '')
    .split('\n')
    .forEach((line) => {
      let rows = line.split('\t')
      let type = rows[0],
        items = rows.slice(1)
      switch (type) {
        case 'ERMHDR':
          proj.header = items
          break
        case '%T':
          table = proj.tables[rows[1]] = []
          break
        case '%F':
          fields = items
          break
        case '%R':
          table.push(toDict(fields, items))
          break
        default:
          break
      }
    })
  return proj
}

function toDict(ks, vs) {
  let dic = {}
  ks.forEach((k, i) => (dic[k] = vs[i]))
  return dic
}

export function make_tree(proj) {
  let { PROJWBS, TASK, PROJECT } = proj.tables
  let pid = PROJECT.find((p) => p.export_flag === 'Y').proj_id
  let wbs = {}
  PROJWBS.forEach((w) => {
    if (w.proj_id === pid)
      wbs[w.wbs_id] = Object.assign(w, {
        name: w.wbs_name,
        children: [],
        color: 'gray',
      })
  })

  let tree = { name: 'root', children: [] }
  Object.values(wbs).forEach((w) => {
    let parent = wbs[w.parent_wbs_id] || tree
    parent.children.push(w)
  })

  TASK.forEach((t) => {
    if (t.proj_id === pid) {
      let parent = wbs[t.wbs_id]
      parent.children.push(
        Object.assign(t, {
          name: t.task_name,
          children: [],
          color: 'blue',
        }),
      )
    }
  })
  find_start_end(tree)
  return tree
}

function find_start_end(
  tree,
  ks = 'target_start_date',
  ke = 'target_end_date',
) {
  function find_start(tree) {
    if (tree.start) {
    } else if (tree[ks]) tree.start = Date.parse(tree[ks])
    else tree.start = Math.min(...tree.children.map(find_start))
    return tree.start
  }
  find_start(tree)
  function find_end(tree) {
    if (tree.end) {
    } else if (tree[ke]) tree.end = Date.parse(tree[ke])
    else tree.end = Math.max(...tree.children.map(find_end))
    return tree.end
  }
  find_end(tree)
}
