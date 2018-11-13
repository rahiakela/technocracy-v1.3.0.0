import {App} from './app';

const PORT = 3000;

const server = new App().app;

server.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
