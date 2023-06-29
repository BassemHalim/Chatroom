package config

import "github.com/olahol/melody"

var Socket *melody.Melody

func CreateSocket() *melody.Melody {
	channel := melody.New()
	channel.HandleMessage(func(s *melody.Session, msg []byte) {
		channel.Broadcast(msg)
	})
	Socket = channel
	return channel
}
