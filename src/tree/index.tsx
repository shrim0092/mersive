import "./index.css";
import animalTree from "./data.json";

const formatName = (name: string, dots: number) => {
  let res = "";
  res += name[0];
  for(let i = 0; i < dots; i++) res += ".";
  for(let i = 1; i < name.length; i++) res += name[i];
  return res;
}

const renderTree = (node, depth, level) => (
  <div className="line" key={node.name} 
  style={{ marginLeft: `${depth * 40}px` }}>
    {formatName(node.name, level)}
    {node.children && node.children.map(child => renderTree(child, 1, level + 1))}
    {/* {node.name} for bonus*/}
  </div>
);

const Tree = () => {
  return (
    <div className="tree">
      { renderTree(animalTree, 0, 0) }
      </div>
  );
};

export default Tree;
