# Redis (Remote Dictionary Server)

For the list of commands: https://redis.io/docs/latest/commands/

## Datatype in redis:

- String, Hash, List, Set, Sorted Set, Stream, Bitmap, BitField, GeoSpatial

String - A series of bits
List - Sorted in insertion order
Hashes - Object like
Sorted Set - sorted by associated score
Streams - append only logs

More on: https://redis.io/docs/latest/develop/data-types/

### String commands

|   SET    |   GET    |  MSET  |  MGET  |    SETNX    | MSETNX |
| :------: | :------: | :----: | :----: | :---------: | :----: |
|   INCR   |  INCRBY  |  DECR  | DECRBY | INCRBYFLOAT |  Nan   |
| SETRANGE | GETRANGE | SUBSTR |  Nan   |     Nan     |  Nan   |
|  APPEND  |  GETDEL  |  LCS   | STRLEN |     Nan     |  Nan   |
|  SETEX   |  GETEX   | PSETEX |  Nan   |     Nan     |  Nan   |

- Limit Max: 512MB

More [commands on String](https://redis.io/docs/latest/commands/?group=string)

```sh
SET name:1 Devdutt
GET name:1
MSET name:2 Name2 name:3 Name3
MGET name:1 name:2 name:3

SET counter 0
INCR counter
INCRBY counter 2
GET counter
DECR counter
DECRBY counter -1

// Flag
SETNX name:4 Name4
SET name:5 Name5 nx
SET name:5 NameUpdate xx
```

### List commands

| LPUSH  |  LPOP   | LPUSHX |  Nan   |    Nan     |
| :----: | :-----: | :----: | :----: | :--------: |
| RPUSH  |  RPOP   | RPUSHX |  Nan   |    Nan     |
|  LREM  |  LSET   |  LPOS  | LINDEX |    LLEN    |
| BLMOVE |  BLPOP  | BLMPOP | BRPOP  | BRPOPLPUSH |
| LMPOP  | LINSERT | LMOVE  | LRANGE |   LTRIM    |

- B: block until an element is available

- Limit length: 2e32 - 1

More [commands on List](https://redis.io/docs/latest/commands/?group=list)

```sh
LPUSH fruit "apple"
RPUSH fruit "banana"

LRANGE fruit 0 -1
LLEN fruit
LPOP fruit
RPOP fruit
LINDEX fruit 0
LINSERT fruit BEFORE "apple" "peach"
```

## Set commands

|   SADD   |    SREM     |    SPOP     |    SCARD    |
| :------: | :---------: | :---------: | :---------: |
| SMEMBERS |  SISMEMBER  | SMISMEMBER  | SRANDMEMBER |
|  SUNION  | SUNIINSTORE |
|  SDIFF   | SDIFFSTORE  |
|  SINTER  | SINTERCARD  | SINTERSTORE |
|  SMOVE   |    SSCAN    |

- Limit: 2e32 - 1

More [commands on Set](https://redis.io/docs/latest/commands/?group=set)

```sh
SADD things "window"
SADD things "table"
SCARD things
SMEMBERS things
SISMEMBER things "w" "t"   1
```

### Hashes

|   HSET   |    HGET    |    HSETNX    | HGETALL |  HMGET   |  HMSET  |
| :------: | :--------: | :----------: | :-----: | :------: | :-----: |
|   HLEN   |  HINCRBY   |    HSCAN     |  HKEYS  |  HVALS   | HEXISTS |
| HEXPIRE  | HEXPIREAT  | HEXPIRETIME  |  HTTL   | HPERSIST |
| HPEXPIRE | HPEXPIREAT | HPEXPIRETIME |  HPTTL  |

- p: handles time in milliseconds

- Limit: memory of VM

More [comments on Hash](https://redis.io/docs/latest/commands/?group=hash)

```sh
HSET person name "dev"
HMSET person age 21 gender "M"
HGET person name
HGETALL person
HMGET person name age
HLEN person
HKEYS person
HEXISTS person name
```

### Sorted Sets

ZADD, ZREM, ZCARD, ZINCRBY, ZMPOP
ZRANK, ZCOUNT, ZMSCORE, ZPOPMAX, ZPOPMIN, ZRANGE, ZLEXCOUNT, ZREVRANGE, ZREVRANK, ZSCAN, ZSCORE, ZUNION, ZDIFF, ZINTER

Largest set of commands for a group

More [commands on Sorted set](https://redis.io/docs/latest/commands/?group=sorted-set)

```sh
ZADD score 10 chile
ZADD score 9 chelsea
ZADD score 1 pracklet 2 india 13 japan
ZRANGE score 0 -1
ZREVRANGE score 0 -1
```

### Geospatial

GEOADD, GEOSEARCH, GEODIST, GEOPOS,
GEORADIUS, GEORADIUS_RO, GEORADIUSBYMEMBER, GEORADIUSBYMEMBER_RO

## Other features

JSON, Pub/sub, Transaction

Streams, time-series, Bitfields, Bitmaps, Probablistic

### Pub/sub

| SUBSCRIBE  |  UNSUBSCRIBE  | PUBLISH  |   PUBSUB NUMSUB    |   PUBSUB CHANNELS    |
| :--------: | :-----------: | :------: | :----------------: | :------------------: |
| SSUBSCRIBE | SUNSCUBSCRIBE | SPUBLISH | PUBSUB SHARDNUMSUB | PUBSUB SHARDCHANNELS |
| PSUBSCRIBE | PUNSUBSCRIBE  |   Nan    |    PUSUB NUMPAT    |         Nan          |

- P: pattern, S: sharded channel

### Transaction

| MULTI | EXEC | DISCARD |

| WATCH | UNWATCH |

### General

DEL, EXISTS, TYPE, KEYS, EXPIRE, TTL, PERSIST, INFO (server, keyspace)

More [generic commands](https://redis.io/docs/latest/commands/?group=generic)

### Server managment commands

[Link](https://redis.io/docs/latest/commands/?group=server)

> List of all the commands can be found here: https://redis.io/docs/latest/commands/
> Cheat sheet for quick reference: https://redis.io/learn/howtos/quick-start/cheat-sheet
