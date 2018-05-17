import { BaseRoute } from './route';

export class ViewTVRoute extends BaseRoute {
    public constructor() {
        super('view/tv', '1.0.0');
        this.setMethods();
        this.setRoutes();
    }

    private setMethods() {
        this.methods.push({ group: 'au', name: 'GET' });
        this.methods.push({ group: 'au', name: 'POST' });
        this.methods.push({ group: 'a', name: 'PUT' });
        this.methods.push({ group: 'a', name: 'PATCH' });
        this.methods.push({ group: 'a', name: 'DELETE' });
    }

    private setRoutes() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
        this.router.post('/', (req, res) => {
            this.emit('onPOSTRequest', req, res);
            this.emit('onUpdateTV', req, res);
        });
        this.router.post('/new', (req, res) => {
            this.emit('onNewTVRequest', req, res);
            this.emit('onUpdateTV', req, res);
        });
        this.router.put('/', (req, res) => {
            this.emit('onPUTRequest', req, res)
            this.emit('onUpdateTV', req, res);
        });
        this.router.patch('/', (req, res) => {
            this.emit('onPATCHRequest', req, res)
            this.emit('onUpdateTV', req, res);
        });
        this.router.delete('/', (req, res) => this.emit('onDELETERequest', req, res));
    }
}
