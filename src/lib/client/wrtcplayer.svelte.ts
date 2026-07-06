import { env } from '$env/dynamic/public';

const MTX_PROT = env.PUBLIC_MTX_PROT || 'http';
const MTX_HOST = env.PUBLIC_MTX_HOST || 'localhost';
const MTX_PORT = env.PUBLIC_MTX_PORT || 8889;
const MTX_USER = env.PUBLIC_MTX_USER || '';
const MTX_PASS = env.PUBLIC_MTX_PASS || '';
const MTX_UUID = env.PUBLIC_MTX_UUID || '';

class WRTCPlayer {
    #player: HTMLVideoElement | null = $state(null);
    // @ts-expect-error - external library class
    #reader: MediaMTXWebRTCReader = null;
    #name: string = $state('');
    #type: 'live' | 'mini' = 'mini';
    #user = MTX_USER || '';
    #pass = MTX_PASS || '';

    open = $state(false);

    constructor(type?: 'live' | 'mini', streamName?: string, user?: string, pass?: string) {
        this.#type = type || this.#type;
        this.#user = user || this.#user;
        this.#pass = pass || this.#pass;

        this.#name = streamName || this.#name;
        if (this.#name) this.#init();
    }

    static get BASE_URL() {
        return `${MTX_PROT}://${MTX_HOST}:${MTX_PORT}/${MTX_UUID}`;
    }

    get url() {
        return `${WRTCPlayer.BASE_URL}/${this.#type}`;
    }

    get ref() {
        return this.#player;
    }

    set ref(p) {
        this.#player = p;
    }

    get name() {
        return this.#name;
    }

    #deinit() {
        if (this.#reader) {
            this.#reader?.close();
            this.#reader = null;
        }
        if (this.#player) {
            this.#player.srcObject = null;
        }
    }

    #init() {
        this.#deinit();

        if (!this.#name) {
            return;
        }

        try {
            // @ts-expect-error - external library class
            this.#reader = new MediaMTXWebRTCReader({
                url: `${this.url}/${this.#name}/whep`,
                user: this.#user,
                pass: this.#pass,
                onError: () => {
                    // console.log(`stream disappeared: ${this.#name}`);
                    this.#deinit();
                },
                onTrack: (e: RTCTrackEvent) => {
                    if (this.#player) {
                        this.#player.disablePictureInPicture = true;
                        if (!this.#player.srcObject) {
                            this.#player.srcObject = e.streams[0];
                            // console.log(`playback started: ${this.#name}`);
                        }
                        this.#player.autoplay = true;
                        this.#player.muted = this.#type === 'mini';
                    }
                }
                // onDataChannel: (e: RTCDataChannelEvent) => {
                //     e.channel.binaryType = 'arraybuffer';
                //     e.channel.onmessage = () => {
                //         // console.log('data channel message');
                //     };
                //     e.channel.onclose = () => {
                //         // console.log('data channel close');
                //     };
                // }
            });
            this.open = true;
        } catch {
            console.log('Error: MediaMTXWebRTCReader class not available');
        }
    }

    play(streamName?: string) {
        this.#name = streamName || this.#name;
        this.#init();
    }
}

export { WRTCPlayer };
