fn main() {
    
    let loss = 0;
    let draw = 3;
    let win = 6;

    let mut sum = 0;
    std::fs::read_to_string("./input.txt").expect("Error reading file").lines().for_each(|line| {
        let opponent = line.split(" ").nth(0).unwrap();
        let me = line.split(" ").nth(1).unwrap();

        match me {
            "X" => {
                match opponent {
                    "A" => sum += draw,
                    "B" => sum += loss,
                    "C" => sum += win,
                    _ => panic!("Invalid input")
                }
                sum += 1;
            },
            "Y" => {
                match opponent {
                    "A" => sum += win,
                    "B" => sum += draw,
                    "C" => sum += loss,
                    _ => panic!("Invalid input")
                }
                sum += 2;
            },
            "Z" => {
                match opponent {
                    "A" => sum += loss,
                    "B" => sum += win,
                    "C" => sum += draw,
                    _ => panic!("Invalid input")
                }
                sum += 3;
            },
            _ => panic!("Invalid input")
        }
    });

    println!("{}", sum);

}
