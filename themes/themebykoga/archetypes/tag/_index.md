---
title: {{ $term := index ( split .File.Dir "/") 1 }}"{{ replace $term "-" " " | title }}"
type: "page"
date: {{ .Date }}
draft: false
---

# #tag
So this is the description of the #tag!