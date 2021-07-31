import FooService from "../services/foo.service";

export default function(fooService: FooService) {
  return fooService.getBar();
}