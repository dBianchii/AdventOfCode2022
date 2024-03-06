
fn main() {
    
    
    let mut elves: Vec<usize> = vec![];
    let mut elf_to_add: usize = 0;

    std::fs::read_to_string("./input.txt").expect("Error reading file").lines().for_each(|line| {
        if line.is_empty() {
            elves.push(elf_to_add.clone());
            elf_to_add = 0;
        } else {
            elf_to_add += line.parse::<usize>().unwrap();
        }
    });

    elves.sort();
    elves.reverse();
    
    println!("{}", elves.iter().take(3).sum::<usize>());

}
