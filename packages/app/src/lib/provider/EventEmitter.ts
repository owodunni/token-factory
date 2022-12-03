export interface EventEmitter {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	emit(eventName: string, args: any[]): EventEmitter;

	on(eventName: string, listener: EventListener): EventEmitter;

	addListener(eventName: string, listener: EventListener): EventEmitter;

	off(eventName: string, listener: EventListener): EventEmitter;

	removeListener(eventName: string, listener: EventListener): EventEmitter;

	removeAllListeners(eventName?: string): EventEmitter;
}
