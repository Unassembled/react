export const appendStyle = (scriptToAppend) => {
    const link = document.createElement("link");
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = scriptToAppend;
    document.body.appendChild(link);
}