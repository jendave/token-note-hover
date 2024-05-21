import Logger from "../lib/Logger.js";

export class BackgroundlessControlIcon extends ControlIcon {
    /**
     * Override ControlIcon#draw to remove drawing of the background.
     */
    async draw() {
        // Load the icon texture
        if (!this.iconSrc) {
            this.texture = PIXI.Texture.EMPTY;
        } else {
            try {
                this.texture = this.texture ?? (await loadTexture(this.iconSrc, { fallback: "icons/svg/cancel.svg" }));
            } catch (e) {
                Logger.error(e);
                this.texture = PIXI.Texture.EMPTY;
            }
        }

        // Don't draw a destroyed Control
        if (this.destroyed) return this;

        // Draw border
        this.border
            .clear()
            .lineStyle(2, this.borderColor, 1.0)
            .drawRoundedRect(...this.rect, 5)
            .endFill();
        this.border.visible = false;

        // Hide the background
        this.bg.visible = false;

        // Draw icon
        try {
            this.icon.texture =
                this.texture ??
                (this.iconSrc
                    ? await loadTexture(this.iconSrc, { fallback: "icons/svg/cancel.svg" })
                    : "icons/svg/cancel.svg");
            this.icon.width = this.icon.height = this.size;
            this.icon.tint = Number.isNumeric(this.tintColor) ? this.tintColor : 0xffffff;
        } catch (e) {
            Logger.warn(e.stack ? e.stack : e.message);
            this.icon.texture = "icons/svg/cancel.svg";
            this.icon.width = this.icon.height = this.size;
            this.icon.tint = Number.isNumeric(this.tintColor) ? this.tintColor : 0xffffff;
        }
        return this;
    }
}
