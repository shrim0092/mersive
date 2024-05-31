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
  const [response, setResponse] = useState([]);

  // let req = new XMLHttpRequest();

  // req.onreadystatechange = () => {
  //   if (req.readyState == XMLHttpRequest.DONE) {

  //     let jsonResponse = JSON.parse(req.response);
  //     setResponse(jsonResponse.record);
  //     console.log(jsonResponse.record)
  //   }
  // };
  
  // req.open("GET", "https://api.jsonbin.io/v3/b/6658c89ce41b4d34e4fc0857/latest", true);
  // req.setRequestHeader("X-Master-Key", "$2a$10$8kKvSPuePtQSA/VM/nIbu.FEd4pLZDOcXxh4m5QM/q1szHkycAbBe");
  // req.send();

  const postData = (tree) => {
    let url = "https://api.jsonbin.io/v3/b/665911f9acd3cb34a85056c8";
    let key = "$2a$10$8kKvSPuePtQSA/VM/nIbu.FEd4pLZDOcXxh4m5QM/q1szHkycAbBe";
    let accessKey = "$2a$10$7IlFOebe4Hfq37U.AasdduXcSbkY5ZGmD.Ip4KFg6TvQbQEa5e1LS";

    fetch(url, {
      method: 'PUT',
      headers: {
        'X-Master-Key': key,
        'Content-type' : 'application/json',
        'X-Access-Key': accessKey
      },  
      body: JSON.stringify(tree)
    })
    .then(response => response.json())
    .then(response => {
      console.log("PUT Success response")
      console.log(response)})
    .catch(err => console.log(err))
  }

  const fetchData = async () => {
    let url = "https://api.jsonbin.io/v3/b/665911f9acd3cb34a85056c8/latest";
    let key = "$2a$10$8kKvSPuePtQSA/VM/nIbu.FEd4pLZDOcXxh4m5QM/q1szHkycAbBe";
    
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Master-Key': key
      },
    })
    .then(response => response.json())
    .then(response => {
      console.log("Fetch success")
      console.log(response.record)
      setResponse(response.record);
      setTree(response.record);
    })
    .catch(err => console.log(err))
  }

   useEffect(() => {
    fetchData();

    let levelmap = {};
    processlastchild(tree, 0, levelmap);
    setLastChild(levelmap);
    console.log(levelmap);

  }, [])

  const updateTree = (newWord: any, depth: number) => {
    let currentLevel = tree;
    console.log(currentLevel);

  
    for (let i = 0; i < depth; i++) {
      if(!currentLevel.children || currentLevel.children.length == 0) break;
      currentLevel = currentLevel.children[currentLevel.children.length - 1];
    }
    if (!currentLevel.children) {
      currentLevel.children = [];
    }
    currentLevel.children.push({ name: newWord });
    setTree({ ...tree });
    postData(tree)
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
    postData(tree)
  };

  return (

    <div className="tree">
      {console.log(tree)}
      {renderTreeWithCrossMarks(tree, 0, updateTree, removeNode, true, lastChild)}
    </div>
  );
};

export default Tree;
