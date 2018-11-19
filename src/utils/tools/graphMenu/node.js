import _ from "lodash";

export default class Node {
  constructor(id) {
    this.id = id;
    this.relations = {};
  }

  addEdge(node) {
    this.relations[node.id] = node;
  }

  removeEdge(node) {
    delete this.relations[node.id];
  }

  isLeaf() {
    return _.isEmpty(this.relations);
  }

  parentOf(node) {
    return this.relations[node.id];
  }

  clone() {
    return new Node(this.id);
  }
}
