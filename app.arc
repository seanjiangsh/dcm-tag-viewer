@app
dcm-tag-viewer

@aws
region ap-northeast-1

@static
folder dist
spa true
prune true

@http
/api/*
  method get
  src /api