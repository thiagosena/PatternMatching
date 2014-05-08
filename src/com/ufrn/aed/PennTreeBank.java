package com.ufrn.aed;

import java.io.Closeable;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.DefaultTreeModel;
import javax.swing.tree.TreeModel;

public class PennTreeBank implements Closeable {

	private Reader reader;
	private int currentChar;
	
	public PennTreeBank(Reader reader) throws IOException {
		this.reader = reader;
		this.currentChar = nextChar();
	}
	
	public PennTreeBank(File file) throws IOException {
		this(new FileReader(file));
	}
	
	public PennTreeBank(String filename) throws IOException {
		this(new FileReader(filename));
	}
	
	private int nextChar() throws IOException {
		return reader.read();
	}
	
	private String nextToken() throws IOException {
		if (currentChar == -1) {
			return null;
		}
		
		if (currentChar == '(' || currentChar == ')') {
			String s = Character.toString((char) currentChar);
			currentChar = nextChar();
			return s;
		}

		// white space
		while (Character.isWhitespace(currentChar)) {
			currentChar = nextChar();
		}

		if (currentChar == -1) {
			return null;
		}
		
		if (currentChar == '(' || currentChar == ')') {
			String s = Character.toString((char) currentChar);
			currentChar = nextChar();
			return s;
		}
		
		StringBuilder sb = new StringBuilder();
		sb.append((char) currentChar);
		currentChar = nextChar();
		
		//construindo a palavra
		while (currentChar != '('
				&& currentChar != ')'
				&& currentChar != -1
				&& !Character.isWhitespace(currentChar)) {
			sb.append((char) currentChar);
			currentChar = nextChar();
		}

		return sb.toString();

	}
	
	public TreeModel readPtbTree() throws IOException {

		DefaultMutableTreeNode root = new DefaultMutableTreeNode("ROOT");
		DefaultMutableTreeNode current = root;

		int state = 0;
		String parentesis = "";
		boolean teste = false;
		while (true) {
			String s = nextToken();
			System.out.println("s eh o q? "+s);
			switch (state) {
			case 0:
				if (s == null) {
					return null;
				} else if (s.equals("(")) {
					DefaultMutableTreeNode child = new DefaultMutableTreeNode();
					current.add(child);
					current = child;
					state = 1;
				} else {
					throw new IllegalArgumentException("the PennTreeBank should start with [(]");
				}
				break;
			case 1:
				if (s == null || s.equals("(") || s.equals(")")) {
					throw new IllegalArgumentException("expecting [tag]");
				} else {
					current.setUserObject("("+s);
					state = 2;
				}
				break;
			case 2:
				if (s == null || s.equals(")")) {
					throw new IllegalArgumentException("expecting [(] or [word]");
				} else if (s.equals("(")) {
					DefaultMutableTreeNode child = new DefaultMutableTreeNode();
					current.add(child);
					current = child;
					state = 1;
					if(teste){
						parentesis = "";
					}
				} else {
					if(parentesis.isEmpty()){
						parentesis = parentesis.concat(")");
					}
					DefaultMutableTreeNode child = new DefaultMutableTreeNode(s+parentesis);
					current.add(child);
					state = 3;
				}
				break;
			case 3:
				if (s == null) {
					throw new IllegalArgumentException("expecting [(] or [)]");
				}
				if (s.equals(")")) {
					if (current == null) {
						throw new IllegalArgumentException("too much [)]");
					}
					
					
										
					current = (DefaultMutableTreeNode) current.getParent();
					
					parentesis = parentesis.concat(s);
					//if (parentesis.length() > 0) {  
					//	parentesis = parentesis.substring (0, parentesis.length() - 1);  
					//}
					
					if (current.getParent() == null) {
						return new DefaultTreeModel(root);
					}
				} else if (s.equals("(")) {
					DefaultMutableTreeNode child = new DefaultMutableTreeNode();
					current.add(child);
					current = child;
					state = 1;
					teste = true;
				}
				break;
			}
		}
	}

	@Override
	public void close() throws IOException {
		this.reader.close();
	}

}
