import React, { useEffect, useState } from "react";
import "./index.css";

const Tree = () => {

  const traverse = (root: Element, mapping: { [x: string]: string; }, level: string, idx: number) => {
    mapping[String(root.id)] = level + String(idx);
    root.innerHTML = String(level + String(idx)) + " " + root.innerHTML;
    
    for(let i = 0; i < root.children.length; i++){
      if(root.children[i]) traverse(root.children[i], mapping, level + String(idx) + ".", i + 1);
    }
    
    return;
  }

  const calculateIndex = () => {  
    let mapping = {};
    let tree = document.getElementById('tree');
    let root = tree && tree.children[0];
    if(root) traverse(root, mapping, "", 1);

    console.log(mapping);
  }

  useEffect(() => {
    calculateIndex();
  }, [])

  return (
    <div id="tree">
      <div id="root">
        root
        <div className="branch" id="ant">
          ant
        </div>
        <div className="branch" id="bear">
          bear
          <div className="sub-branch" id="cat">
            cat
          </div>
          <div className="sub-branch" id="dog">
            dog
            <div className="sub-sub-branch" id="elephant">
              elephant
            </div>
          </div>
        </div>
        <div className="branch" id="frog">
          frog
          <div className="sub-branch" id="dolphin">
            dolphin
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tree;

