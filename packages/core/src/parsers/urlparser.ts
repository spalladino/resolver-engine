import Debug from "debug";
import request from "request";
import { SubParser } from "./subparser";

const debug = Debug("resolverengine:urlparser");

export function UrlParser(): SubParser<string> {
  return (url: string): Promise<string | null> =>
    new Promise((resolve, reject) => {
      try {
        // We're using this line for the side-effects
        // tslint:disable-next-line:no-unused-expression
        new URL(url);
      } catch (err) {
        // Not an actual browser url, might be filesystem
        return resolve(null);
      }
      request(url, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        if (response.statusCode >= 200 && response.statusCode <= 299) {
          return resolve(body);
        } else {
          debug(`Got error: ${response.statusCode} ${response.statusMessage}`);
          return resolve(null);
        }
      });
    });
}
