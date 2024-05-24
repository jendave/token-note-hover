/**
 *
 * ElementWrapper - ALTERED
 *
 * @version : 2.0.2
 * @author  : http://www.enea.sk
 *
 * @export
 * @class ElementWrapper
 * @extends {PIXI.DisplayObject}
 */
export class ElementWrapper extends PIXI.DisplayObject {
  /**
   * Creates an instance of ElementWrapper.
   *
   * @param {Element} [container=null]
   */
  constructor(container, contentHTML, note) {
    super();

    // prevents AccessibilityManager crash
    this.children = [];
    this.style = {};
    this.note = note;
    this._contentHTML = contentHTML;

    this.container = container;
    container.style.position = 'absolute';
    container.style.left = '0px';
    container.style.top = '0px';
    document.body.append(container);
    this._repositionHook = Hooks.on('canvasPan', () => this.updateTarget());

    this.prevID = -1;
    this._anchorX = 0;
    this._anchorY = 0;

    this.container.addEventListener('mouseover', () => {
      this.visible = true;
      this.container.addEventListener('mouseleave', () => (this.visible = false));
    });
  }

  /**
   *
   * updateTarget
   *
   */
  updateTarget() {
    if (this.visible === false) return;
    const matrix = this.worldTransform;
    const { bounds } = this;
    this.toGlobal(new PIXI.Point(0, 0));
    const rightSide = matrix.tx < canvas.screenDimensions[0] / 2;
    const paddingX = (rightSide ? 1 : -1) * (bounds.width / 2 + 30);
    this.container.style.transform = `translate(${matrix.tx - bounds.width / 2 + paddingX}px, ${
      matrix.ty - bounds.height / 2
    }px)`;
  }

  /**
   *
   * render
   *
   */
  render() {
    if (this.prevID === this.transform._worldID || this.container === null) {
      return;
    }

    this.updateTarget();

    this.prevID = this.transform._worldID;
  }

  /**
   *
   * destroy
   *
   */
  destroy() {
    this.container.remove();
    Hooks.off('canvasPan', this._repositionHook);
    this.container = null;
    this.prevID = null;

    super.destroy();
  }

  /**
   *
   * bounds
   *
   * @readonly
   */
  get bounds() {
    return this.container.getBoundingClientRect();
  }

  /**
   *
   * anchorX
   *
   */
  get anchorX() {
    return this._anchorX;
  }

  /**
   *
   * anchorX
   *
   * @param {number} value
   */
  set anchorX(value) {
    this._anchorX = value;

    this.pivot.x = value * this.bounds.width;
  }

  /**
   *
   * anchorY
   *
   */
  get anchorY() {
    return this._anchorY;
  }

  /**
   *
   * anchorY
   *
   * @param {number} value
   */
  set anchorY(value) {
    this._anchorY = value;

    this.pivot.y = value * this.bounds.height;
  }

  /**
   *
   * anchorXY
   *
   * @param {number} value
   */
  set anchorXY(value) {
    this.anchorX = value;
    this.anchorY = value;
  }

  /**
   * visible
   *
   * @param {boolean} value
   */
  set visible(value) {
    if (!this.container) {
      return;
    }
    this.container.style.opacity = value ? '1' : '0';
    if (value === false) {
      this._fadeoutTimeout = setTimeout(() => {
        this.container.style.display = 'none';
      }, 50);
    } else {
      this.container.innerHTML = '';
      this.container.innerHTML = this._contentHTML;

      this.container.style.display = '';
      clearTimeout(this._fadeoutTimeout);
    }
  }

  get visible() {
    if (!this.container) {
      return false;
    }
    return this.container.style.opacity !== '0';
  }
}

ElementWrapper.prototype.renderWebGL = ElementWrapper.prototype.render;
ElementWrapper.prototype.renderCanvas = ElementWrapper.prototype.render;
