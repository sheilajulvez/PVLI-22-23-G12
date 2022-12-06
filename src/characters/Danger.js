export default class Danger extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'danger');

		this.scene.add.existing(this);

	}
}