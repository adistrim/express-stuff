### Convenient way to [coerce primitive values](https://zod.dev/?id=coercion-for-primitives).

```javascript
const schema = z.coerce.string();
schema.parse("tuna"); // => "tuna"
schema.parse(12); // => "12"
```

### [Primitives](https://zod.dev/?id=primitives)

```javascript
// primitive values
z.string();
z.number();
z.bigint();
z.boolean();
z.date();
z.symbol();

// empty types
z.undefined();
z.null();
z.void(); // accepts undefined

// catch-all types
// allows any value
z.any();
z.unknown();

// never type
// allows no values
z.never();
```