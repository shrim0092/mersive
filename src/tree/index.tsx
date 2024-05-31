import "./index.css";
import animalTree from "./data.json";

const renderTree = (node, depth) => (
  <div className="line" key={node.name} 
  style={{ marginLeft: `${depth * 40}px` }}>
    {node.name}
    {node.children && node.children.map(child => renderTree(child, 1))}
  </div>
);

const Tree = () => {
  return (
    <div className="tree">
      { renderTree(animalTree, 0) }
      </div>
  );
};

export default Tree;
