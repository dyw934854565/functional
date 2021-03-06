说明：
适配器模式是一对相对简单的模式。在本书提到的设计模式中，有一些模式跟适配器模式的结构非常相似，比如装饰者模式、代理模式和外观
模式（参见第19章）。这几种模式都属于“包装模式”，都是由一个对象来包装另一个对象。区别它们的关键仍然是模式的意图。


1. 适配器模式主要用来解决两个已有接口之间不匹配的问题，它不考虑这些接口是怎样实现的，也不考虑它们将来可能会如何演化。适配器
模式不需要改变已有的接口，就能够
使它们协同作用。
1. 装饰者模式和代理模式也不会改变原有对象的接口，但装饰者模式的作用是为了给对象增加功能。装饰者模式常常形成一条长的装饰链，
而适配器模式通常只包装一次。代理模式是为了控制对对象的访问，通常也只包装一次。
1. 外观模式的作用倒是和适配器比较相似，有人把外观模式看成一组对象的适配器，但外观模式最显著的特点是定义了一个新的接口。