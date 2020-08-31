import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

/**
 * PWA Application update service
 */
@Injectable()
export class UpdateService {

  public constructor(updates: SwUpdate) {}
}
