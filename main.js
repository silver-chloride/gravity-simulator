let x = 0;

class Object {
    //좌표, 질량, 반지름, 색을 받아 물체 객체를 생성하는 함수
    constructor(x=0, y=0, mass=1, ratio, color) {
        this.x = x; //1px = 1m
        this.y = y;

        this.vx = 0; //1px/s = 1m/s
        this.vy = 0;

        this.mass = mass; //kg

        this.Fx = 0;
        this.Fy = 0;

        this.ratio = ratio;
        
        this.color = color;

        this.div = document.createElement('div');
    }

    //물체를 화면에 추가하는 함수
    add() {
        this.div.classList.add('test');
        document.body.appendChild(this.div);
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;
        this.div.style.width = `${this.ratio*2}px`;
        this.div.style.height = `${this.ratio*2}px`;
        this.div.style.backgroundColor = this.color;
    }
    
    //엘리먼트의 css 위치 값을 물체의 좌표 값으로 설정하는 함수
    move() {
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;
    }

    /**
     * 물체의 시간, 좌표 변화량을 입력 받아 t초 동안 x,y/1s의 속도로 이동시키는 함수
     * @param {number} t 물체가 x,y/1s의 속도로 이동될 시간 변화량, 단위 : 초
     * @param {number} dx 물체의 x좌표 변화량
     * @param {number} dy 물체의 y좌표 변화량
     */
    velocity(t, dx, dy) {
        this.x = dx*t;
        this.y = dy*t;
        this.move(this.x, this.y);
    }

    /**
     * 물체의 시간, 속도 변화량을 입력 받아 t초 동안 x,y/1s의 가속도로 가속시키는 함수
     * @param {number} t 물체가 x,y/1s의 속도로 가속된 시간 변화량, 단위 : 초
     * @param {number} dx 물체가 x좌표속도 변화량
     * @param {number} dy 물체가 y좌표속도 변화량
     */
    acceleration(t, dx, dy) {
        this.vx = (dx*t)/2;
        this.vy = (dy*t)/2;
        this.velocity(t, this.vx, this.vy);
    }

    /**
     * 물체의 시간, x,y 좌표 방향 힘을 입력 받아 t초 동안 x,y만큼의 힘을 가하는 함수
     * @param {number} t 물체에 힘이 가해진 시간 변화량, 단위 : 초
     * @param {number} x 물체에 가해진 x 좌표 방향 힘
     * @param {number} y 물체에 가해진 y 좌표 방향 힘
     */
    force(t, x, y) {
        this.Fx = x;
        this.Fy = y;
        
        //t초 동안 0.001초 마다 0.001초 동안 힘/질량 크기만큼 가속
        for(let i=0; i<(t/0.001)+1; i++) {
            setTimeout(()=> {
                this.acceleration(0.001*i, x/this.mass, y/this.mass);
            }, 1*i);
            
            //만약 반복이 끝난다면, 물체의 힘을 0으로 설정
            if(i == t/0.001) {
                this.Fx = 0;
                this.Fy = 0;
            }
        }
    }
}

//예시
let dot = new Object(0, 30, 2, 50, 'red');
let dot2 = new Object(0, 100, 1, 50, 'blue'); 

let objects = [dot, dot2];

for (let i of objects) {
    i.add();
}

dot.force(6, 30, 0);