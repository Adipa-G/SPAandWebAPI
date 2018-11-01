export class HttpLogInfo {
    trackingId: string;
    calledOn: string;
    callerAddress: string;
    requestIdentity: string;
    verb: string;
    requestUri: string;
    requestHeaders: string;
    request: string;
    statusCode: number;
    reasonPhrase: string;
    responseHeaders: string;
    response: string;
    calledDuration: string;

    showHeaders: boolean;
}