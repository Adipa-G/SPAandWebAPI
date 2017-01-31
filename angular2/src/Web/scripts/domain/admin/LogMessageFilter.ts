import {OrderAndPage} from '../common/OrderAndPage';

export class LogMessageFilter extends OrderAndPage {
    logLevel: string;
    logger: string;
    fromDateLocal: string;
    fromDate: string;
    toDateLocal: string;
    toDate: string;
}