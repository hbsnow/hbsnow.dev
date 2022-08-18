---
layout: "../../layouts/BlogPostLayout.astro"
title: MySQL と PostgreSQL のコマンド
tags: [database]
description: MySQL と PostgreSQL のコマンドの対応表ろSQL逆引き。
createdAt: 2019-06-01
updatedAt: 2019-07-26
---

よく使う MySQL と PostgreSQL のコマンドの対応表です。

| 説明             | MySQL              | PostgreSQL           |
| ---------------- | ------------------ | -------------------- |
| DB 一覧          | `SHOW databases;`  | `\l`                 |
| DB 選択          | `USE db_name;`     | `\c db_name`         |
| テーブル一覧     | `SHOW table_name;` | `\d`                 |
| テーブル構造     | `DESC table_name;` | `\d table_name`      |
| トランザクション | `BEGIN;`           | `BEGIN TRANSACTION;` |

## SQL 文逆引き

久々に使うと忘れてることもあるので、基本的なものからあまり使わないものも列挙しています。

### DB の作成

```sql
CREATE DATABASE
  db_name
;
```

### DB の削除

```sql
DROP DATABASE
  db_name
;
```

### テーブルの作成

```sql
CREATE TABLE
  table_name(
    id         integer      not null,
    name       varchar(255) not null,
    created_at date,
    primary key (id)
  )
;
```

### テーブルの削除

```sql
DROP TABLE
  table_name
;
```

### テーブルのリネーム

```sql
-- MySQL
RENAME TABLE
  before_table_name
TO
  after_table_name
;

-- PostgreSQL
ALTER TABLE
  before_table_name
RENAME
  after_table_name
;
```

### カラムの追加

```sql
ALTER TABLE
  table_name
ADD
  column_name slug varchar(255) not null
;
```

### カラムの削除

```sql
ALTER TABLE
  table_name
DROP
  column_name slug
;
```

### 重複の除外

```sql
SELECT DISTINCT
  category
FROM
  table_name
;
```

### 重複を除外した集計

```sql
-- 重複とNULLの除外
SELECT
  count(DISTINCT column_name)
FROM
  table_name
;
```

### 範囲

```sql
SELECT
  *
FROM
  table_name
WHERE
  column_name BETWEEN 2 AND 5
;
```

この場合、`column_name` の `2`

と `5` は含まれる。

### 複数条件

```sql
SELECT
  *
FROM
  table_name
WHERE
  column_name IN ('A', 'B', 'C')
;
```

### 部分一致・前方一致・後方一致

```sql
SELECT
  *
FROM
  table_name
WHERE
  column_name LIKE '%foo%'
;
```

前方一致なら `foo%`、後方一致なら `%foo`。不一致であれば `NOT LIKE`。

### ソート

```sql
SELECT
  *
FROM
  table_name
ORDER BY
  column_name DESC
;
```

### 取得件数の制限

```sql
SELECT
  *
FROM
  table_name
LIMIT
  10
;
```
