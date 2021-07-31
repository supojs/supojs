import SimpleService from "../services/simple";

export default function(simple: SimpleService) {
  return simple.get();
}