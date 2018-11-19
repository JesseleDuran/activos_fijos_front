import _ from "lodash";
import Node from "./node";

export default class Graph {
  constructor() {
    this.nodes = {};
    this.numberOfNodes = 0;
    this.numberOfEdges = 0;
  }

  add(node) {
    if (!this.nodes[node.id]) {
      this.numberOfNodes++;
      this.nodes[node.id] = node;
    }
  }

  remove(node) {
    if (this.nodes[node.id]) {
      this.numberOfNodes--;
      delete this.nodes[node.id];
    }
  }

  relate(nodeA, nodeB) {
    if (this.contains(nodeA) && this.contains(nodeB)) {
      this.nodes[nodeA.id].addEdge(nodeB);
      this.numberOfEdges++;
    }
  }

  disrelate(nodeA, nodeB) {
    if (this.contains(nodeA) && this.contains(nodeB)) {
      this.nodes[nodeA.id].removeEdge(nodeB);
      this.numberOfEdges--;
    }
    return this.contains(nodeA) && this.contains(nodeB);
  }

  contains(node) {
    return this.nodes[node.id];
  }

  getSubGraph(graph, from, to, uvr = []) {
    const node = this.nodes[from];

    const { relations } = node;
    graph.add(node.clone());
    if (to.indexOf(node.id) !== -1) uvr.push(node.id);

    if (node.isLeaf()) return node;

    for (const index in relations) {
      const indexNode = new Node(index);
      graph.add(indexNode);
      graph.relate(node, indexNode);
      const result = this.getSubGraph(graph, index, to, uvr);
      if (uvr.indexOf(result.id) !== -1) uvr.push(node.id);
      else if (graph.disrelate(node, result)) graph.remove(result);
    }
    return node;
  }

  difference(anotherGraph) {
    const { nodes } = anotherGraph;
    const differences = [];
    _.forEach(this.nodes, node => {
      if (!nodes[node.id]) differences.push(node);
    });
    return differences;
  }
}
