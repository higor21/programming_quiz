import Api from 'config/api';

export class AppService {
  private api = Api.getInstance();

  // fetchConstants = () => this.api.get('configuracoes/constantes');
}

export default AppService;
