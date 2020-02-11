---
description: >-
  中介者模式「Mediator
  Pattern」：用一个中介对象来封装一系列的对象交互，中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。中介者模式又称为调停者模式，它是一种对象行为型模式。
---

# 中介者模式

## 模式动机

对于一个模块来说可能有很多个对象组成，而且这些对象之间可能存在相互的引用，为了减少对象两两之间复杂的引用关系，使之成为一个松耦合的系统，我们需要一个中介者对象，来使各个对象之间的相互联系关系转换为对象只需与中介者对象联系的关系，这样各个对象完全就不需要考虑其他对象的变化，只需要关心中介者对象就可以

## 实现

泡泡堂游戏是童年时候的游戏，当玩家数目为 2 时，其中一个玩家死亡及结束，同时通知它的对手胜利。但是如果是 4 个玩家或 8 个玩家，一般就需要分红蓝两队进行游戏。每当有一个玩家死亡时，**都需要检测是不是最后一个死亡的玩家，如果是的话需要给本队每个人发送团队失败，也需要给对方每个人发送团队胜利**。假如不使用中介者模式。每个玩家都需要记录其他玩家的一些信息。

```javascript
function Player(name, teamColor) {
  this.partners = [] // 队友列表
  this.enemies = [] // 敌人列表
  this.state = 'live' // 玩家状态
  this.name = name // 角色名字
  this.teamColor = teamColor // 队伍颜色
}
```

当玩家胜利或失败时提示信息

```javascript
Player.prototype.win = function() {
  // 玩家团队胜利
  console.log('winner: ' + this.name)
}
Player.prototype.lose = function() {
  // 玩家团队失败
  console.log('loser: ' + this.name)
}
```

当玩家死亡时需要遍历队友及对手

```javascript
Player.prototype.die = function() {
  // 玩家死亡
  let all_dead = true

  this.state = 'dead' // 设置玩家状态为死亡
  for (let i = 0, partner; (partner = this.partners[i++]); ) {
    // 遍历队友列表
    if (partner.state !== 'dead') {
      // 如果还有一个队友没有死亡，则游戏还未失败
      all_dead = false
      break
    }
  }

  if (all_dead === true) {
    this.lose() // 通知自己游戏失败
    for (let i = 0, partner; (partner = this.partners[i++]); ) {
      // 通知队友团队失败
      partner.lose()
    }
    for (let i = 0, enemy; (enemy = this.enemies[i++]); ) {
      // 通知敌人团队胜利
      enemy.win()
    }
  }
}
```

接下来编写创建玩家的工厂函数, 当有人加入时还需要遍历每个现存的玩家将新玩家添加到队友或对手的列表当中

```javascript
// 创建玩家
const playerFactory = function(name, teamColor) {
  const newPlayer = new Player(name, teamColor)

  for (let i = 0, player; (player = players[i++]); ) {
    // 通知所有的玩家，有新角色加入
    if (player.teamColor === newPlayer.teamColor) {
      // 如果是同一队的玩家
      player.partners.push(newPlayer) // 相互添加到队友列表
      newPlayer.partners.push(player)
    } else {
      player.enemies.push(newPlayer) // 相互添加到敌人列表
      newPlayer.enemies.push(player)
    }

    players.push(newPlayer)
    return newPlayer
  }
}
```

随着玩家的增多，队伍的增多，就不仅仅是遍历能够解决的问题了。

### 用中介者改造

创建一个 `playerDirector` 并暴露一个 `receiveMessage` 负责接受各个 player 对象发送的消息。

```javascript
let playerDirector = (function() {
  const players = {}, // 保存所有玩家
    operations = {} // 中介者可以执行的操作
  /****************新增一个玩家***************************/

  operations.addPlayer = function(player) {
    const teamColor = player.teamColor // 玩家的队伍颜色
    players[teamColor] = players[teamColor] || [] // 如果该颜色的玩家还没有成立队伍，则新成立一个队伍
    players[teamColor].push(player) // 添加玩家进队伍
  }
  /****************移除一个玩家***************************/

  operations.removePlayer = function(player) {
    const teamColor = player.teamColor, // 玩家的队伍颜色
      teamPlayers = players[teamColor] || [] // 该队伍所有成员
    for (let i = teamPlayers.length - 1; i >= 0; i--) {
      // 遍历删除
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1)
      }
    }
  }
  /****************玩家换队***************************/

  operations.changeTeam = function(player, newTeamColor) {
    // 玩家换队
    operations.removePlayer(player) // 从原队伍中删除
    player.teamColor = newTeamColor // 改变队伍颜色
    operations.addPlayer(player) // 增加到新队伍中
  }

  operations.playerDead = function(player) {
    const teamColor = player.teamColor,
      teamPlayers = players[teamColor]
    let all_dead = true
    // 玩家死亡 // 玩家所在队伍
    for (let i = 0, player; (player = teamPlayers[i++]); ) {
      if (player.state !== 'dead') {
        all_dead = false
        break
      }
    }

    if (all_dead === true) {
      // 全部死亡
      for (let i = 0, player; (player = teamPlayers[i++]); ) {
        player.lose() // 本队所有玩家 lose
      }
      for (let color in players) {
        if (color !== teamColor) {
          const teamPlayers = players[color]
          for (let i = 0, player; (player = teamPlayers[i++]); ) {
            player.win()
          }
        }
      }
    }
  }

  const reciveMessage = function() {
    const message = Array.prototype.shift.call(arguments)
    operations[message].apply(this, arguments)
  }
  
  return {
    reciveMessage: reciveMessage
  }
})()
```

可以看到，**除了中介者本身，没有一个玩家知道其他任何玩家的存在**，玩家与玩家之间的耦合关系已经完全解除，每个玩家的任何操作都不需要通知其他玩家，而**只需要给中介者发送一个消息，中介者处理完消息之后会把处理结果反馈给其他玩家对象**，我们还可以给中介者对象扩展更多的功能，以适应游戏需求不断的变化。

## 小结

中介者模式是迎合迪米特法则的一种实现。迪米特法则也叫最少知识原则，是指一个对象应该尽可能少地了解另外的对象\(类似不和陌生人说话\)。如果对象之间的耦合性太高，一个对象发生改变之后，难免会影响到其他的对象，跟“城门失火，殃及池鱼”的道理是一样的。而在中介者模式里，对象之间几乎不知道彼此的存在，它们只能通过中介者对象来互相影响对方。

{% hint style="info" %}
但是中介者模式也存在一些缺点。缺点就是会新增一个中介者对象，因为它负责与各个对象之间的交互，通常中介者对象的复杂性就会很高，其自身就变成一个难以维护的对象。
{% endhint %}

