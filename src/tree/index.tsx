import React, { useState, useEffect } from "react";
import "./index.css";
import animalTree from "./data.json";

const renderTreeWithCrossMarks = (node: { name: any; children: any; }, depth: number, onUpdate: (newWord: any, depth: any) => void, onRemove: { (nodeToRemove: any, depth: any): void; (arg0: any, arg1: any): void; }, display: boolean, levelmap: { [x: string]: any; hasOwnProperty?: any; }) => (
  
  <div className="line" key={node.name} style={{ marginLeft: `${depth * 20}px` }}>
    <div>
      <span>{node.name}</span>
      <span className="cross" onClick={() => onRemove(node, depth)}>✖</span>
    </div>
    {node.children && node.children.map(child => renderTreeWithCrossMarks(child, depth + 1, onUpdate, onRemove, levelmap.hasOwnProperty(depth + 1) && child.name == levelmap[depth + 1], levelmap))}
    {display && <input type="text" placeholder={node.name} style={{ marginLeft: `${(depth + 1) * 20}px` }} onKeyDown={(e) => handleKeyDown(e, depth, onUpdate)} />}
  </div>
);

const processlastchild = (node: { name: any; children: any; }, depth: number, levelmap: { [x: string]: any; }) => {
  levelmap[depth] = node.name;
  {node.children && node.children.map(child => processlastchild(child, depth + 1, levelmap))}
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, depth: number, onUpdate: { (newWord: any, depth: any): void; (arg0: any, arg1: any): void; }) => {
  if (e.key === "Enter" && e.target.value.trim() !== "") {
    const newWord = e.target.value.trim();
    onUpdate(newWord, depth);
    e.target.value = "";
  }
};

const Tree = () => {
  const [tree, setTree] = useState(animalTree);
  const [lastChild, setLastChild] = useState({})


  useEffect(() => {
    let levelmap = {};
    processlastchild(tree, 0, levelmap);
    setLastChild(levelmap);
    console.log(levelmap);
  }, [])

  const updateTree = (newWord: any, depth: number) => {
    let currentLevel = tree;
    for (let i = 0; i < depth; i++) {
      currentLevel = currentLevel.children[currentLevel.children.length - 1];
    }
    if (!currentLevel.children) {
      currentLevel.children = [];
    }
    currentLevel.children.push({ name: newWord });
    setTree({ ...tree });
  };

  const removeNode = (nodeToRemove: { name: string; children?: undefined; } | { name: string; children: ({ name: string; children?: undefined; } | { name: string; children: { name: string; }[]; })[]; }, depth: number) => {
    let currentLevel = tree;
    if (depth === 0) {
      setTree(null);
      return;
    }
    for (let i = 0; i < depth - 1; i++) {
      currentLevel = currentLevel.children[currentLevel.children.length - 1];
    }
    currentLevel.children = currentLevel.children.filter(node => node !== nodeToRemove);
    setTree({ ...tree });
  };

  return (

    <div className="tree">
      {renderTreeWithCrossMarks(tree, 0, updateTree, removeNode, true, lastChild)}
    </div>
  );
};

export default Tree;
