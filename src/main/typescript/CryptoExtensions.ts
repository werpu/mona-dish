import {Crypto, Hash} from "./Messaging";
import {AssocArrayCollector} from "./SourcesCollectors";
import {LazyStream} from "./Stream";

/*
 * Some crypto implementations which might come in handy
 */


/**
 * basic json stringify encryption impl
 * this does not really full encryption except for a standard json stringyfywith an encapsulation json
 *
 * the return value resembles:
 * <pre>
 *     {
 *         encryptedData: <data as string>
 *     }
 * </pre>
 */
export class JSONCrypto implements Crypto {
    decode(data: any): any {
        if (data?.encryptedData) {
            return JSON.parse(data.encryptedData);
        }
        return data;
    }

    encode(data: any) {
        return {
            encryptedData: JSON.stringify(data)
        }
    }
}


/**
 * a class with rotating crypto keys and a timeout functionality which drops decodes after a certain period of time
 * if the message is not decoded by then
 * We use MD5 sums as identifier generation after encryption to make sure
 * a trace was possible
 *
 * every 10th encode or so we drop stale messages which are not used anymore.
 * The idea behind this is to have a generic wrapper which allows messages with dynamic encryption
 * where keys/salts only exist for a certain period of time before expiring!
 * That way someone who implements such a scheme does not have to take care about the bookeeping mechanisms!
 *
 * I will leave it up to the system integrator to provide a rotating crypto class, because this is highly
 * implementation dependent. But it helps to have a wrapper!
 *
 */
export class ExpiringCrypto implements Crypto {

    private static MAX_GC_CYCLES = 10;
    private gcCycleCnt = 0;
    private storedMessages: { [key: string]: number } = {};

    /**
     * @param timeout timeout in miliseconds until a message is expired
     * @param parentCrypto the embedded decorated crypto algorithm
     * @param hashSum hashshum implementation to generate a hash
     */
    constructor(private timeout: number, private parentCrypto: Crypto, private hashSum: Hash) {

    }

    decode(data: any): any {
        //if ((this.gcCycleCnt++ % ExpiringCrypto.MAX_GC_CYCLES) === 0) {

        const currTime = new Date().getTime();
        this.storedMessages = LazyStream.ofAssoc(this.storedMessages)
            .filter(data => data[1] >= currTime).collect(new AssocArrayCollector());

        let rotatingEncoded = this.hashSum.encode(data);
        if (!this.storedMessages?.[rotatingEncoded.toString()]) {
            throw Error("An item was tried to be decryted which either was expired or invalid");
        }
        return this.parentCrypto.decode(data);
        4
    }

    encode(data: any): any {
        let encoded = this.parentCrypto.encode(data);
        //ok use the hashsum really only to store expirations, theoretically there could be a second message which does not invalidate the first one
        //but this is very unlikely unless a message is sent over and over again, in this case we have a timeout extension anyway!
        let rotatingEncoded = this.hashSum.encode(encoded);
        this.storedMessages[rotatingEncoded.toString()] = (new Date().getTime()) + this.timeout;
        return encoded;
    }
}