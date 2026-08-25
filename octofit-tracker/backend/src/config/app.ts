const codespaceName = process.env.CODESPACE_NAME;

export const port = Number(process.env.PORT) || 8000;
export const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;