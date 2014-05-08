package com.ufrn.aed;

import java.util.Enumeration;

import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.TreeModel;
import javax.swing.tree.TreeNode;

public class PTBPrettyPrint {

	public static String ptbString(TreeModel tree) {
		StringBuffer sb = new StringBuffer();

		@SuppressWarnings("unchecked")
		Enumeration<DefaultMutableTreeNode> itr = ((DefaultMutableTreeNode) tree.getRoot()).preorderEnumeration();

		while (itr.hasMoreElements()) {
			DefaultMutableTreeNode tn = itr.nextElement();
			if (tn.isLeaf()) {
				continue;
			}
			// add prefix
			for (TreeNode p : tn.getPath()) {
				// if parent has sibling node
				if (p == tn) {

				} else if (hasNextSibling((DefaultMutableTreeNode) p)) {
					sb.append(" ");
				}
			}
			// if root has sibling node
			
			if (tn.isRoot()) {
				//sb.append("\n");
			} else if (tn.getChildCount() == 1) {
				DefaultMutableTreeNode child = (DefaultMutableTreeNode) tn
						.getChildAt(0);
				if (child.isLeaf()) {
					sb.append(""+tn.getUserObject() + " " + child.getUserObject() + "\n");
				} else {
					sb.append(""+tn.getUserObject());
				}
			} else {
				sb.append(" "+tn.getUserObject());
			}

		}

		return sb.toString();
	}

	private static boolean hasNextSibling(DefaultMutableTreeNode tn) {
		return tn.getNextSibling() != null;
	}

}
