import {OrderAndPage} from '../common/orderAndPage';

export class HttpLogFilter extends OrderAndPage {
    logLevel: string;
    trackId: string;
    fromDateLocal : string;
    fromDate: string;
    toDateLocal: string;
    toDate : string;
}