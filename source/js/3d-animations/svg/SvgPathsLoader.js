import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

export class SvgPathsLoader {
  constructor(svgFormsConfig) {
    this.svgFormsConfig = svgFormsConfig;
    this.paths = {};

    this.createSvgPathsCache();
  }

  getSvgShape(name) {
    return this.paths[name];
  }

  createSvgPathsCache() {
    Object.values(this.svgFormsConfig).forEach((shapeName) => {
      this.paths[shapeName] = this.createSvgPaths(shapeName);
    });
  }

  createSvgPaths(name) {
    return new Promise((resolve) => {
      const loader = new SVGLoader();

      // load a SVG resource
      loader.load(
        // resource URL
        `./img/module-6/svg-forms/${name}.svg`,
        function (data) {
          resolve(data.paths);
        },
      );
    });
  }
}
