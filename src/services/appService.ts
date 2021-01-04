import Api from 'config/api';
import { PaginationParams, QResultParams, UserResultParams } from 'features/app/appTypes';

export const DEFAULT_COUNT_BY_PAGE = 40;
export class AppService {
  private api = Api.getInstance();

  fetchQuestions = ({ page = 1, pageSize = DEFAULT_COUNT_BY_PAGE }: PaginationParams) =>
    this.api.get(`questions?_page=${page}&_limit=${pageSize}`)

  addResult = (body: UserResultParams) => this.api.post('results', body);

  getResult = () => this.api.get('result');

  updateQuestion = (id: number | string, body: QResultParams) =>
    this.api.put(`result/${id}`, body)
}

export default AppService;
