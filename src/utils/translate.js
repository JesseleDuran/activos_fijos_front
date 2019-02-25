import React from "react";
import { I18n } from "react-i18next";
import i18n from "./i18n";

export default function translate(key) {
  return (
    <I18n ns={["defaultNamespace"]}>{( { i18n }) => i18n.t(key)}</I18n>
  );
}

export function translateKey(key) {
  return i18n.t(key);
}
