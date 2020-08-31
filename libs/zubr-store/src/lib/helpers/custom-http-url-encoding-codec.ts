import { HttpUrlEncodingCodec } from '@angular/common/http';

/**
 * Custom HTTP URL Encoding Codec
 */
export class CustomHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
  /**
   * Encode key
   * @param k
   */
  public encodeKey(k: string): string {
    return super.encodeKey(k)
      .replace(new RegExp('%5B', 'g'), '[')
      .replace(new RegExp('%5D', 'g'), ']');
  }
}
