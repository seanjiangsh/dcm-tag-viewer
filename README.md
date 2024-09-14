# DICOM Tag Viewer

Got some medical images in DICOM format and want to check the information or previewing image quickly? DICOM Tag Viewer is here to help!

The DICOM Tag Viewer is a user-friendly tool for displaying DICOM information in your browser. Users can simply drag-n-drop DICOM images to display tag info.

Using dynamic tables, it presents nested tag data, allowing users to search, expand, and filter columns as needed. The DICOM Tag Viewer also supports the DICOM SR (Structured Report) format.

All operations are performed on the frontend, guaranteeing that no sensitive data leaves the browser.

---

[![cov](https://raw.githubusercontent.com/seanjiangsh/dcm-tag-viewer/gh-pages/badges/coverage.svg)](https://github.com/seanjiangsh/dcm-tag-viewer/actions)
[![Test Workflow](https://github.com/seanjiangsh/dcm-tag-viewer/actions/workflows/test.yml/badge.svg)](https://github.com/seanjiangsh/dcm-tag-viewer/actions/workflows/test.yml)
[![Deploy to AWS](https://github.com/seanjiangsh/dcm-tag-viewer/actions/workflows/deploy.yml/badge.svg)](https://github.com/seanjiangsh/dcm-tag-viewer/actions/workflows/deploy.yml)

### preview:

 <img src="assets/preview-cover.png" alt="preview cover" width="50%"/>

### [live demo](https://dcm-tag-viewer.sean-j.dev)

## Available Scripts

| Script             | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| npm run dev        | Start the development server (http://localhost:5173)            |
| npm run build      | Build the production-ready code                                 |
| npm run cy         | Start Cypress UI                                                |
| npm run test       | Run E2E and unit tests                                          |
| npm run arc:deploy | Deploy to AWS Lambda via Architect framework (AWS key required) |

## This project utilizes the following technologies:

### Frontend

  <div >
    <a href="https://react.dev" target="_blank" rel="noreferrer"><img src="./assets/icons/react.png" height="36"  alt="react" /></a>
    <a href="https://redux.js.org" target="_blank" rel="noreferrer"><img src="./assets/icons/redux.png" height="36"  alt="redux" /></a>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer"><img src="./assets/icons/vite.png" height="36"  alt="vite" /></a>
    <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer"><img src="./assets/icons/typescript.png" height="36"  alt="typescript" /></a>
  </div>

### Cloud

  <div >
    <a href="https://aws.amazon.com" target="_blank" rel="noreferrer"><img src="./assets/icons/aws.png" height="36"  alt="aws" /></a>
    <a href="https://aws.amazon.com/lambda" target="_blank" rel="noreferrer"><img src="./assets/icons/awslambda.svg" height="36"  alt="aws-lambda" /></a>
  </div>

### CI/CD

  <div >
    <a href="https://www.cypress.io/" target="_blank" rel="noreferrer">
      <img src="./assets/icons/cypress.svg" alt="cypress" class={imgClass} />
    </a>
    <a href="https://github.com/features/actions" target="_blank" rel="noreferrer">
      <img src="./assets/icons/github-actions.svg" height="36"  alt="github-actions" />
    </a>
    <a href="https://arc.codes" target="_blank" rel="noreferrer">
      <img src="./assets/icons/architect.svg" height="36"  alt="architect-framework" />
    </a>
  </div>
