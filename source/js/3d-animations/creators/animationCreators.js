import Animation from "../../Animation/Animation";
import { easeOutCubic } from "../../helpers/easing";

function getCurrentTransformPropertyByName(
  propertyName,
  { to, from },
  progress
) {
  const defaultValue = ["scale", "scaleX", "scaleY", "scaleZ"].includes(
    propertyName
  )
    ? 1
    : 0;

  const fromValue =
    typeof from[propertyName] === "number" ? from[propertyName] : defaultValue;

  return typeof to[propertyName] === "number"
    ? fromValue + (to[propertyName] - fromValue) * progress
    : fromValue;
}

export function createObjectTransformAnimation(obj, transform, config) {
  return new Animation({
    func: (progress) => {
      const scale = getCurrentTransformPropertyByName(
        "scale",
        transform,
        progress
      );

      obj.position.set(
        ...["transformX", "transformY", "transformZ"].map((name) =>
          getCurrentTransformPropertyByName(name, transform, progress)
        )
      );
      obj.rotation.set(
        ...["rotateX", "rotateY", "rotateZ"].map((name) =>
          getCurrentTransformPropertyByName(name, transform, progress)
        )
      );

      if (typeof scale === "number") {
        obj.scale.set(scale, scale, scale);
      } else {
        obj.scale.set(
          ...["scaleX", "scaleY", "scaleZ"].map((name) =>
            getCurrentTransformPropertyByName(name, transform, progress)
          )
        );
      }
    },
    ...config,
  });
}

export function createBounceAnimation(obj) {
  const amplitude = 0.3 + Math.random() / 1.5;
  const period = 700 + 300 * Math.random();

  return new Animation({
    func: (_, { startTime, currentTime }) => {
      obj.position.y =
        obj.position.y +
        amplitude * Math.sin((currentTime - startTime) / period);
    },
    duration: "infinite",
    delay: 2000,
    easing: easeOutCubic,
  });
}
