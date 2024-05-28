// 查询一级分类
function findChild(arr, id) {
	let childs = [];
	arr.forEach(v => {
		if (v.parentid == id) {
			childs.push(v);
		}
	});
	return childs;
}
// 遍历循环数
function build_treeById(arr, id) {
	let childs = findChild(arr, id);
	if (childs.length == 0) {
		return null;
	}

	// 对于父节点为0的进行循环，然后查出父节点为上面结果_id的节点内容
	childs.forEach((v, k) => {
		let buildTree = build_treeById(arr, v.id);
		if (null != buildTree) {
			v['children'] = buildTree;
		}
	});
	return childs;
}

export { build_treeById }