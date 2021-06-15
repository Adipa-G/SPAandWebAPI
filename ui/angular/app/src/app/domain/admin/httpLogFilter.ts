import { OrderAndPage } from '../common/orderAndPage';

export class HttpLogFilter extends OrderAndPage {
    logLevel: string;
    trackingId: string;
    fromDateLocal: string;
    fromDate: string;
    toDateLocal: string;
    toDate: string;
}