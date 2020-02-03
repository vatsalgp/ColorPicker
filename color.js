const randbw = (a, b) => {
    return Math.floor(Math.random() * (b - a) + a + 1);
};

class color {
    //Private
    r = 0;
    g = 0;
    b = 0;

    toHex(c) {
        let h = c.toString(16);

        if (h.length == 1) {
            h = "0" + h;
        }
        return h;
    }
    toRel(c) {
        let rel = c / 255;

        if (rel == 1) {
            rel = 99;
        } else {
            rel = Math.floor(rel * 100);
        }

        rel = rel.toString(10);
        if (rel.length == 1) {
            rel = "0" + rel;
        }
        return rel;
    }

    //Public
    constructor() {
        this.r = randbw(0, 255);
        this.g = randbw(0, 255);
        this.b = randbw(0, 255);
    }
    hex() {
        return {
            r: this.toHex(this.r),
            g: this.toHex(this.g),
            b: this.toHex(this.b)
        };
    }
    rel() {
        return {
            r: this.toRel(this.r),
            g: this.toRel(this.g),
            b: this.toRel(this.b)
        };
    }
}

const hexString = c => "#" + c.hex().r + c.hex().g + c.hex().b;
const rgbString = c => "rgb(" + c.r + ", " + c.g + ", " + c.b + ")";
