package com.ufrn.aed;

import java.io.IOException;

import javax.swing.tree.TreeModel;

public class Main {
	public static void main(String args[]) throws IOException {
		PennTreeBank reader = new PennTreeBank("flat.txt");
		TreeModel tree = null;
		
		while ((tree = reader.readPtbTree()) != null) {
			System.out.println(PTBPrettyPrint.ptbString(tree));
		}
		
		reader.close();
	}
}
